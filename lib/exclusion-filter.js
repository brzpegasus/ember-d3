module.exports = function exclusionFilter(packageNames) {
	return function(pkg) {
		if (packageNames.length === 0) {
			return true
		}

		return (
			packageNames
				.indexOf(pkg.name) === -1
		)
	}
}
