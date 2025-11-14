import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import api from "../Api";

const GoogleLoginButton = () => {
    function onSuccess(codeResponse: CredentialResponse) {
        api.post("/auth/google", { code: codeResponse.credential })
            .then(_res => {
                location.reload();
            })
            .catch(e => {
                const msg =
                    e?.response?.data?.message ||
                    "Something went wrong";
                alert(msg);
            });
    }

    function onError() {
        alert("Error logging in with google");
    }

    return (
        <div className="w-full justify-center flex cursor-pointer">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    );
};

export default GoogleLoginButton;
