// import React from 'react';
// import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
//   <Grid item xs={12} sm={half ? 6 : 12}>
//     <TextField
//       name={name}
//       onChange={handleChange}
//       variant="outlined"
//       required
//       fullWidth
//       label={label}
//       autoFocus={autoFocus}
//       type={type}
//       InputProps={name === 'password' ? {
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton onClick={handleShowPassword}>
//               {type === 'password' ? <Visibility /> : <VisibilityOff />}
//             </IconButton>
//           </InputAdornment>
//         ),
//       } : null}
//     />
//   </Grid>
// );

// export default Input;

import React from 'react';
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputProps {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  half?: boolean;
  autoFocus?: boolean;
  type?: string;
  handleShowPassword?: () => void;
  value?: string;
}

const Input: React.FC<InputProps & Omit<MuiTextFieldProps, 'variant'>> = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  value,
  ...other
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <MuiTextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      value={value}
      InputProps={
        name === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      {...other}
    />
  </Grid>
);

export default Input;
