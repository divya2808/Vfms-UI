import { extend } from "vee-validate";
import { required, alpha, min } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required"
});
extend("alpha", {
  ...alpha,
  message: "This field should only contain alphanumeric characters"
})
extend("min", {
  ...min
})