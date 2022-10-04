// if data is undefined then there is error in response
const MyResponse = <T>(message: string, response?: T) => {
    return {
        message,
        response
    }
}
export default MyResponse