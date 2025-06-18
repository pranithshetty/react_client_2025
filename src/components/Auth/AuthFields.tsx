import React from 'react';

interface Props {
  formData: { email: string; password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthFields: React.FC<Props> = ({ formData, onChange }) => (
  <>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={onChange}
      required
    />
    <br /><br />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={onChange}
      required
    />
  </>
);
