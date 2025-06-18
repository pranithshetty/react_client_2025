import { GoogleLogin } from '@react-oauth/google';

interface Props {
  onSuccess: (token: string) => void;
  onError: (msg: string) => void;
}

export const GoogleAuth: React.FC<Props> = ({ onSuccess, onError }) => (
  <GoogleLogin
    onSuccess={async (response) => {
      if (!response.credential) return;
      onSuccess(response.credential);
    }}
    onError={() => onError('Google login failed')}
  />
);
