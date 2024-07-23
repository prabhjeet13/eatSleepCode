
export const problemsAPI = {
    tagwise : "http://localhost:4000/api/v1/problems/getallproblemsByTagWise",
    addProblem: "http://localhost:4000/api/v1/problems/addproblem",
    addTestCase: "http://localhost:4000/api/v1/problems/addtestcases",
    getProblemById : "http://localhost:4000/api/v1/problems/getProblemById",
    executeProblemRun : "http://localhost:4000/api/v1/compiler/run",
    executeProblemSubmit : "http://localhost:4000/api/v1/compiler/submit"
}

export const authAPI = {
    sendotpapi : "http://localhost:4000/api/v1/auth/sendotp",
    signupapi : "http://localhost:4000/api/v1/auth/signup",
    signinapi : "http://localhost:4000/api/v1/auth/signin"
}