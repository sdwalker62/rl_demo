/**
 *
 * @param {Array<Array<number>>} A
 * @param {Array<Array<number>>} B
 * @returns
 */
export function multiply(A, B) {
	var aNumRows = A.length,
		aNumCols = A[0].length,
		bNumRows = B.length,
		bNumCols = B[0].length,
		m = new Array(aNumRows); // initialize array of rows
	for (var r = 0; r < aNumRows; ++r) {
		m[r] = new Array(bNumCols); // initialize the current row
		for (var c = 0; c < bNumCols; ++c) {
			m[r][c] = 0; // initialize the current cell
			for (var i = 0; i < aNumCols; ++i) {
				m[r][c] += A[r][i] * B[i][c];
			}
		}
	}
	return m;
}
