import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import api from "../Api";
import type { TUser } from "../Types";

const GoogleLoginButton = () => {
    function onSuccess(codeResponse: CredentialResponse) {
        api.post("/auth/google", { code: codeResponse.credential })
            .then(res => {
                const userData: { data: TUser } = res.data;
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
        <div className="google-wrapper w-full justify-center flex">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    );
};

export default GoogleLoginButton;
