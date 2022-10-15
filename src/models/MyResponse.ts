const MyResponse = <T>(error: boolean = false, message: string, response?: T, pageCount = 1) => {
    return {
        error,
        message,
        pageCount,
        response
    }
}
export default MyResponse