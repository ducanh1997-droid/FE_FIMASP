import React from 'react';
import GoogleLogin from 'react-google-login';

const LoginWithGoogle = () => {
    const responseGoogle = (response) => {
        console.log(response);
        // Gửi thông tin người dùng lên server để xác thực
    };

    return (
        <GoogleLogin
            clientId="704255930120-luafmge6hlk7g4e4ui7vb9qcaih98oev.apps.googleusercontent.com"
            buttonText="Đăng nhập với Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default LoginWithGoogle;