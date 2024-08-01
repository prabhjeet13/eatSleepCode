
export const problemsAPI = {
    tagwise : "http://localhost:4000/api/v1/problems/getallproblemsByTagWise",
    addProblem: "http://localhost:4000/api/v1/problems/addproblem",
    editProblem: "http://localhost:4000/api/v1/problems/editproblem",
    addTestCase: "http://localhost:4000/api/v1/problems/addtestcases",
    getProblemById : "http://localhost:4000/api/v1/problems/getProblemById",
    executeProblemRun : "http://localhost:4000/api/v1/compiler/run",
    executeProblemSubmit : "http://localhost:4000/api/v1/compiler/submit",
    executeProblemIDE : "http://localhost:4000/api/v1/compiler/iderun",
    deleteTestCase : "http://localhost:4000/api/v1/problems/deletetestcase",
    editTestCase : "http://localhost:4000/api/v1/problems/edittestcase",
}

export const userAPI = {
    userDet : "http://localhost:4000/api/v1/user/details",
}

export const authAPI = {
    sendotpapi : "http://localhost:4000/api/v1/auth/sendotp",
    signupapi : "http://localhost:4000/api/v1/auth/signup",
    signinapi : "http://localhost:4000/api/v1/auth/signin"
}