/* eslint "no-var":off, "ember-suave/prefer-destructuring":off */

var recast = require('recast');
var inflect = require('inflect');
var types = recast.types;
var namedTypes = types.namedTypes;
var b = recast.types.builders;


function buildExportDefaultDefinition(packageName, deps, node) {
  return b.expressionStatement(
    b.callExpression(
      b.identifier('define'), [
        b.literal(packageName),
        b.arrayExpression(deps.map(function(name) { return b.literal(name); })),

        node
      ]
    )
  );
}

function getDependenciesForDefine(node) {
  if (namedTypes.CallExpression.check(node)) {
    return node.arguments[0].elements.map(function(e) { return e.value; });
  } else {
    return [];
  }
}

function isAMDFunctionBody(node, deps) {
  return namedTypes.FunctionExpression.check(node) &&
    node.id === null &&
    !!node.params &&
    node.params.length === deps.length &&
    namedTypes.Identifier.check(node.params[0]) &&
    (node.params[0].name === 'exports' || node.params[0].name === inflect.camelize(inflect.underscore(deps[0]), false));
}

function isDefineCallExpression(node) {
  return namedTypes.CallExpression.check(node) &&
    node.callee.name === 'define' &&
    !!node.arguments &&
    namedTypes.ArrayExpression.check(node.arguments[0]) &&
    node.arguments[1].name === 'factory';
}

module.exports = function rewriteAMDFunction(code, packageName) {
  var ast = recast.parse(code);

  var amdDependencies;
  var amdFunctionBody;

  types.visit(ast, {
    visitCallExpression(path) {
      if (isDefineCallExpression(path.node)) {
        amdDependencies = getDependenciesForDefine(path.node);
      }

      this.traverse(path);
    }
  });

  types.visit(ast, {
    visitFunctionExpression(path) {
      if (isAMDFunctionBody(path.node, amdDependencies)) {
        amdFunctionBody = path.node;
      }

      this.traverse(path);
    }
  });
  
  ast = buildExportDefaultDefinition(packageName, amdDependencies, amdFunctionBody);
  return recast.print(ast).code;
};
