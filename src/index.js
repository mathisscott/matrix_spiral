import "./styles.css";

const matrix_1 = [
  [4, 5, 6],
  [8, 9, 7],
  [2, 1, 3]
];

const matrix_2 = [
  [7, 1, 4, 5, 6],
  [8, 9, 11, 23, 25],
  [2, 3, 17, 16, 18],
  [20, 12, 14, 22, 24],
  [10, 15, 13, 21, 19]
];

/* 
const expected_1 = [
  [1, 2, 3],
  [8, 9, 4],
  [7, 6, 5]
];

const expected_2 = [
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9]
];


*/

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
<h2>Unroll a Matrix</h2>
${unrollMatrix(matrix_1)}
${unrollMatrix(matrix_2)}
`;

function unrollMatrix(matrix) {
  if (matrix.length < 1) {
    return [];
  }

  const num_rows = matrix.length;
  const num_cols = matrix[0].length;
  const sorted = [...matrix].flat().sort((a, b) => a - b);
  const unwound_matrix = [];

  for (let i = 0; i < num_rows; i++) {
    unwound_matrix[i] = new Array(num_rows);
  }

  let top = 0;
  let bottom = num_rows - 1;
  let left = 0;
  let right = num_cols - 1;
  let index = 0;

  while (true) {
    if (left > right) {
      break;
    }

    // top row
    for (let i = left; i <= right; i++) {
      unwound_matrix[top][i] = sorted[index++];
    }
    top++;

    if (top > bottom) {
      break;
    }

    // right column
    for (let i = top; i <= bottom; i++) {
      unwound_matrix[i][right] = sorted[index++];
    }
    right--;

    if (left > right) {
      break;
    }

    // bottom row
    for (let i = right; i >= left; i--) {
      unwound_matrix[bottom][i] = sorted[index++];
    }
    bottom--;

    if (top > bottom) {
      break;
    }

    // left column
    for (let i = bottom; i >= top; i--) {
      unwound_matrix[i][left] = sorted[index++];
    }
    left++;
  }

  console.log(sorted);
  console.log(unwound_matrix);
  console.log("rows: ", num_rows);
  console.log("cols: ", num_cols);

  return "ohai";
}
