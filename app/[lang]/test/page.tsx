import { FormGroup } from "@/src/shared/components/formGroup/form-group";
import { HelperText } from "@/src/shared/components/helperText/helper-text";
import { Input } from "@/src/shared/components/input/input";
import { Label } from "@/src/shared/components/label/label";
import { InputValidationContainer } from "@/src/shared/components/validation/form-validation-container";
import { WithLocale } from "@/src/shared/types/with-locale";
import { TestForm } from "@/test-form";
import { FC } from "react";

const Test: FC<WithLocale> = () => {
  return <TestForm />;
};

export default Test;
