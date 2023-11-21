import * as Yup from "yup";

export const AdminLoginSchema = Yup.object({
    username: Yup.string().max(55,"Username must not be greater than 15 characters.").required("Username field is required."),
    password: Yup.string().max(15,"Password must not be greater than 15 characters.").required("Password field is required."),
});

// export const AdminLoginSchema = Yup.object({
//     email: Yup.string().max(255,"Email must not be greater than 255 characters.").matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ , 'Email must be a valid email address.').required("Email field is required."),
//     password: Yup.string().max(255,"Password must not be greater than 255 characters.").required("Password field is required."),
// });

export const ProductSchema = Yup.object({
    title: Yup.string().max(10,"Title must not be greater than 10 characters.").required("Title field is required."),
    price: Yup.string().max(10,"Price must not be greater than 10 characters.").required("Price field is required."),
    description: Yup.string().max(255,"Title must not be greater than 255 characters.").required("Description field is required."),
    category: Yup.string().max(255,"Title must not be greater than 255 characters.").required("Category field is required."),
    // image: Yup.string().max(255,"Title must not be greater than 255 characters.").required("Title field is required."),
});

export const ProductUpdateSchema = Yup.object({
    title: Yup.string().max(100,"Title must not be greater than 100 characters.").required("Title field is required."),
    price: Yup.string().max(10,"Price must not be greater than 10 characters.").required("Price field is required."),
    description: Yup.string().max(255,"Title must not be greater than 255 characters.").required("Title field is required."),
    category: Yup.string().max(255,"Title must not be greater than 255 characters.").required("Title field is required."),
    // image: Yup.string().max(255,"Title must not be greater than 255 characters.").required("Title field is required."),
});

export const UserSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().max(255,"Email must not be greater than 255 characters.").matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ , 'Email must be a valid email address.').required("Email field is required."),
    address: Yup.object({
      city: Yup.string().required('City is required'),
      street: Yup.string().required('Street is required'),
      number: Yup.number().required('Number is required'),
      zipcode: Yup.string().required('Zipcode is required'),
    }),
    name: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
    }),
    phone: Yup.string().required('Phone is required'),
  });

  export const UserUpdateSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().max(255,"Email must not be greater than 255 characters.").matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ , 'Email must be a valid email address.').required("Email field is required."),
    address: Yup.object({
      city: Yup.string().required('City is required'),
      street: Yup.string().required('Street is required'),
      number: Yup.number().required('Number is required'),
      zipcode: Yup.string().required('Zipcode is required'),
    }),
    name: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
    }),
    phone: Yup.string().required('Phone is required'),
  });