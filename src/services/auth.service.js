import { Auth } from "aws-amplify";

class AuthService {
    getCurrentAuthenticatedUser() {
        return Auth.currentAuthenticatedUser();
    }
}

export default AuthService;
