const MyResponse = <T>(error: boolean = false, message: string, response?: T) => {
    return {
        error,
        message,
        response
    }
}
export default MyResponse