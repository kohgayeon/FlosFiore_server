// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email 
                FROM User 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// 패스워드 체크
async function selectUserPassword(connection, email) {
  const selectUserPasswordQuery = `
        SELECT userIdx, pwd
        FROM User 
        WHERE email = ?`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    email
  );

  return selectUserPasswordRow;
}
// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT userIdx
        FROM User 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
    selectUserAccountQuery,
    email
  );
  
  return selectUserAccountRow[0];
}

//1. Dao 에서 해당 query문 작성
async function insertUserSignUp(connection, userSignUpInfoParams) {
  const signUpUsersQuery = `
      INSERT INTO User(name, email ,region, pwd)
      VALUES (?, ?, ?, ?);
      `;

  const [insertUserSignUpInfoRow] = await connection.query(
    signUpUsersQuery,
    userSignUpInfoParams
  );

  return insertUserSignUpInfoRow;
}

async function checkEmailDuplicate(connection, email) {
  const selectEmailDuplicateQuery = `
    SELECT exists(
      SELECT *
      FROM User
      WHERE email = ?
    )as t;
  `;

  const [EmailDuplicateRow] = await connection.query(selectEmailDuplicateQuery, email);

  return EmailDuplicateRow;
}


module.exports = {
  selectUserEmail,
  selectUserPassword,
  selectUserAccount,
  insertUserSignUp,
  checkEmailDuplicate,
};
