// type InputPropsType = {
//   type: string;
//   name: string;
//   id: string;
//   placeholder: string;
//   label: string;
//   flex?: boolean;
// };

// function Input({ type, name, id, placeholder, label, flex }: InputPropsType) {
//   return (
//     <div className={`${flex ? "grid items-end gap-2 grid-cols-3" : ""}`}>
//       <label
//         htmlFor={id}
//         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         id={id}
//         placeholder={placeholder}
//         className="bg-gray-50 border col-span-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       />
//     </div>
//   );
// }

// export default Input;

import React, { useState } from "react";
import {
  TextField as MuiTextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";

// import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/joy/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import MailOutlineIcon from "@mui/icons-material/MailOutline";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import { formatCurrency, formatInputNum } from "utils";

type TextFieldWithIconProps = {
  name: string;
  type: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const TextFieldWithIcon = ({
  name,
  type,
  label,
  value,
  handleChange,
}: TextFieldWithIconProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        value={value}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <MailOutlineIcon />
          </InputAdornment>
        }
        label={label}
        type={type}
        size="small"
      />
    </FormControl>
  );
};

type TextFieldProps = {
  name: string;
  type: string;
  label: string;
  value: string;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  showError?: boolean;
  touched?: boolean;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  helperText?: string;
  titleText?: string;
  readOnly?: boolean;
  startAdornment?: string;
  formatInput?: boolean;
  disableAutoComplete: boolean;
  placeholder?: string;
  endAdornment?: string;
  inputFontSize?: string;
  isfetching?: boolean;
  confirmed?: boolean;
  typeForm?: string;
};

export const TextField = ({
  name,
  type,
  label,
  value,
  handleChange,
  error,
  showError,
  touched,
  handleBlur,
  disabled,

  titleText,
  readOnly,
  startAdornment,
  disableAutoComplete,
  placeholder,
  endAdornment,
  isfetching,
  confirmed,
  typeForm,
  inputFontSize = "!text-base",
  ...otherProps
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {titleText && (
        <div className="mb-3 text-sm text-gray-400">{titleText}</div>
      )}
      <MuiTextField
        fullWidth
        id={name}
        label={label}
        name={name}
        type={type === "password" ? (showPassword ? "text" : type) : type}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        classes={{
          root: `!rounded`,
        }}
        InputProps={{
          ...(readOnly && { readOnly: true }),
          classes: {
            root: "!rounded",
            input: `${
              showError ? "!text-red-500" : "!text-gray-500"
            } !flex-1 ${inputFontSize}`,
          },
          sx: [
            {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(226 232 240)",
              },
            },
          ],
          ...(startAdornment && {
            startAdornment: (
              <InputAdornment
                position="start"
                component={() => (
                  <div className="mr-1 text-sm text-gray-400">
                    {startAdornment}
                  </div>
                )}
              />
            ),
          }),
          ...(endAdornment && {
            endAdornment: (
              <InputAdornment
                position="end"
                classes={{
                  root: "!justify-end",
                  // root: "!min-h-[3rem] !h-[3rem] -m-[14px]",
                }}
              >
                {endAdornment}
              </InputAdornment>
            ),
          }),
          ...(type === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }),

          ...(name === "email" &&
            typeForm === "signup" && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    {isfetching && value ? (
                      <CircularProgress
                        color="neutral"
                        size="sm"
                        value={8}
                        variant="solid"
                      />
                    ) : confirmed ? (
                      <CheckCircleIcon className=" text-green-600" />
                    ) : null}
                  </IconButton>
                </InputAdornment>
              ),
            }),
        }}
        {...(disabled && { disabled })}
        value={value}
        {...(handleChange && {
          onChange: (e) => {
            handleChange(e);
          },
        })}
        {...(handleBlur && { onBlur: handleBlur })}
        {...(error &&
          touched && {
            error: touched && Boolean(error),
            helperText: touched && error,
          })}
        //{...(error && showError && { error , helperText })}
        {...(disableAutoComplete && {
          autoComplete: type === "password" ? "new-password" : "off",
        })}
        {...(placeholder && { placeholder })}
        {...otherProps}
      />
    </>
  );
};

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: 48 * 4.5 + 8,
//       width: 250,
//     },
//   },
// transitionDuration: 3000,
// MenuListProps: {
//   children: <MenuItem>memme</MenuItem>,
// },
//};

// export const Select = ({
//   handleChange,
//   dropDown,
//   dropDownEmptyText,
//   inputLabel,
//   titleValue,
//   subTitleValue,
//   defaultValue,
//   disableInput,
//   disabled,
//   valueAlt,
//   setValueAlt,
//   isLoading,
//   placeholder,
// }) => {
//   const [value, setValue] = useState(defaultValue || "");

//   useEffect(() => {
//     setValue(valueAlt);
//   }, [valueAlt]);

//   const handleInputChange = (e) => {
//     const id = e.target.value;
//     const findId = dropDown.find((i) => i.id === id);
//     setValueAlt
//       ? setValueAlt(findId?.[titleValue || "value"])
//       : setValue(findId?.[titleValue || "value"]);
//     handleChange(findId);
//   };

//   const id = `select-${inputLabel}`;

//   return (
//     <FormControl
//       fullWidth
//       size="small"
//       classes={{
//         root: "!h-14 w-full !rounded",
//       }}
//     >
//       <InputLabel id={id} shrink>
//         Select {inputLabel}
//       </InputLabel>
//       <MuiSelect
//         displayEmpty
//         labelId={id}
//         value={valueAlt || value}
//         onChange={handleInputChange}
//         input={
//           <OutlinedInput
//             notched
//             label={`Select ${inputLabel}`}
//             classes={{
//               root: "h-full !rounded",
//               input: "h-full",
//               // notchedOutline: "!border-slate-200",
//             }}
//             disabled={disabled}
//           />
//         }
//         renderValue={(selected) => {
//           return (
//             <>
//               {selected === "" || !selected || disableInput ? (
//                 <span className="text-sm text-gray-400">
//                   {placeholder || "Click to select"}
//                 </span>
//               ) : (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   <Chip
//                     label={valueAlt || value}
//                     sx={{ height: 28 }}
//                     classes={{
//                       root: "!text-gray-500 !rounded !bg-primary/5 !text-sm",
//                     }}
//                   />
//                 </Box>
//               )}
//             </>
//           );
//         }}
//         MenuProps={MenuProps}
//         classes={{
//           root: "!h-16",
//         }}
//       >
//         {(!disabled || !isLoading) && dropDown?.length ? (
//           dropDown.map((item, index) => (
//             <MenuItem
//               key={item.id}
//               value={item.id}
//               disabled={item?.disabled}
//               classes={{
//                 root: "flex flex-col !items-start",
//               }}
//             >
//               <div className="relative flex w-full flex-row items-start justify-start">
//                 {/* {item?.["serviceLogo"] && (
//                   <div className="mr-2">
//                     <img
//                       src={item?.["serviceLogo"]}
//                       className="object-contain w-6 h-6 rounded-sm"
//                     />
//                   </div>
//                 )} */}
//                 <div className="flex flex-col">
//                   <div className="text-sm text-gray-600">
//                     {item?.[titleValue || "value"]}
//                     {item?.disabled && " - (not available)"}
//                   </div>
//                   {subTitleValue && (
//                     <div className="text-sm lowercase text-gray-400">
//                       {item?.[subTitleValue]}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </MenuItem>
//           ))
//         ) : (
//           <div className="p-2 text-sm text-gray-400">
//             {"Loading ..." || `${dropDownEmptyText}`}
//           </div>
//         )}
//       </MuiSelect>
//     </FormControl>
//   );
// };

// export const Autocomplete = ({
//   inputLabel,
//   options,
//   titleValue,
//   subTitleValue,
//   handleChange,
//   handleInputTextChange,
//   valueAlt,
//   setValueAlt,
//   loadingText = "",
//   disabled,
//   isLoading,
// }) => {
//   const [value, setValue] = useState("");

//   return (
//     <MuiAutocomplete
//       multiple
//       freeSolo
//       disablePortal
//       loading={Boolean(options?.length || valueAlt?.length)}
//       loadingText={<span className="text-sm">{loadingText}</span>}
//       options={options || []}
//       getOptionLabel={(option) => option?.[titleValue || "title"]}
//       renderOption={(props, option) => (
//         <Box component="li" {...props}>
//           {option?.[titleValue]}
//           {subTitleValue && (
//             <>&nbsp; - {formatCurrency(option?.[subTitleValue])}</>
//           )}
//         </Box>
//       )}
//       value={[valueAlt] || [value]}
//       onChange={(event, newValue) => {
//         const val = newValue?.[newValue?.length - 1] || "";

//         setValueAlt ? setValueAlt(val) : setValue(val);
//         handleChange(val);
//         if (handleInputTextChange) {
//           handleInputTextChange();
//         }
//       }}
//       renderTags={(value, getTagProps) => (
//         <>
//           {value?.[0]?.[titleValue || "title"] && (
//             <Chip
//               variant="contained"
//               label={value?.[0]?.[titleValue || "title"]}
//               {...getTagProps({ index: 0 })}
//               classes={{ root: "!text-gray-500 !bg-primary/5 !rounded-sm" }}
//             />
//           )}
//         </>
//       )}
//       renderInput={(params) => (
//         <MuiTextField
//           {...params}
//           placeholder={Boolean(valueAlt || value) ? "" : `Select ${inputLabel}`}
//           autoComplete="off"
//           label={`Select ${inputLabel}`}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           InputProps={{
//             classes: {
//               root: "!rounded-sm !text-[16px]",
//               input: "!text-sm placeholder:!text-sm",
//             },
//             sx: [
//               {
//                 ".MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgb(226 232 240)",
//                 },
//               },
//             ],
//             ...params.InputProps,
//           }}
//           onChange={(e) => {
//             if (handleInputTextChange) {
//               handleInputTextChange();
//             }
//           }}
//         />
//       )}
//       PaperComponent={({ children }) => {
//         return (
//           <div className="rounded-lg bg-white p-1 shadow-md">
//             {!isLoading ? (
//               <div className="w-full overflow-auto rounded-md border border-slate-200 bg-white text-gray-500 shadow-md">
//                 {children}
//               </div>
//             ) : (
//               <div className="p-4 text-gray-500 ">Loading...</div>
//             )}
//           </div>
//         );
//       }}
//       classes={{
//         input: "!text-gray-500 !text-[16px]",
//         option: "!text-sm",
//       }}
//       disabled={disabled}
//     />
//   );
// };

// // Checkbox Inputs
// const CheckIcon = styled("span")(({ theme }) => ({
//   borderRadius: 3,
//   width: 16,
//   height: 16,
//   boxShadow:
//     theme.palette.mode === "dark"
//       ? "0 0 0 1px rgb(16 22 26 / 40%)"
//       : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
//   backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
//   backgroundImage:
//     theme.palette.mode === "dark"
//       ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
//       : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
//   ".Mui-focusVisible &": {
//     outline: "2px auto rgba(19,124,189,.6)",
//     outlineOffset: 2,
//   },
//   "input:hover ~ &": {
//     backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
//   },
//   "input:disabled ~ &": {
//     boxShadow: "none",
//     background:
//       theme.palette.mode === "dark"
//         ? "rgba(57,75,89,.5)"
//         : "rgba(206,217,224,.5)",
//   },
// }));

// const CheckIconStyled = styled(CheckIcon)({
//   backgroundColor: "#3d81b9",
//   backgroundImage:
//     "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
//   "&:before": {
//     display: "block",
//     width: 16,
//     height: 16,
//     backgroundImage:
//       "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
//       " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
//       "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
//     content: '""',
//   },
//   "input:hover ~ &": {
//     backgroundColor: "#3d81b9",
//   },
// });

// function BpCheckbox(props) {
//   return (
//     <MuiCheckbox
//       sx={{
//         "&:hover": { bgcolor: "transparent" },
//       }}
//       disableRipple
//       color="default"
//       checkedIcon={<CheckIconStyled />}
//       icon={<CheckIcon />}
//       inputProps={{ "aria-label": "Checkbox demo" }}
//       {...props}
//     />
//   );
// }

// export const CheckboxInputs = ({ checkList, handleChange, rowAligned }) => {
//   return (
//     <FormGroup
//       classes={{
//         root: rowAligned ? "flex !flex-row" : "",
//       }}
//     >
//       {checkList?.map((item) => (
//         <FormControlLabel
//           key={item?.value}
//           classes={{ label: "!text-sm" }}
//           control={
//             <BpCheckbox
//               onChange={(e) => {
//                 handleChange(e);
//               }}
//               value={item?.value}
//               checked={item?.checked}
//               disabled={item?.disabled}
//             />
//           }
//           label={item?.label}
//         />
//       ))}
//     </FormGroup>
//   );
// };
