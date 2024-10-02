import React, { useEffect, useState } from "react";
import {
  Text,
  Form,
  RadioGroup,
  useForm,
  FormFooter,
  FormSection,
  FormHeader,
  Label,
  RequiredAsterisk,
  ErrorMessage,
  LoadingButton,
  Spinner,
} from "@forge/react";
import { RandomUserPreferences } from "../userPreferencesStore";
import { ForgeElement } from "@forge/react/out/types";
import ForgeReconciler from "@forge/react";
import { invoke } from "@forge/bridge";

const GENDERS_OPTIONS = [
  { name: "male", value: "male", label: "male" },
  { name: "female", value: "female", label: "female" },
  { name: "random", value: "random", label: "random" },
];

const App = (): ForgeElement => {
  const { handleSubmit, register, getFieldId, formState } =
    useForm<RandomUserPreferences>();

  const [initDone, setInitDone] = useState(false);
  const [defaultFormState, setSefaultFormState] = useState<
    RandomUserPreferences | undefined
  >();

  const setPreferences = async (data: RandomUserPreferences) => {
    await invoke("setUserPreferences", data);
  };

  useEffect(() => {
    async function initialise() {
      try {
        const userPreferences =
          await invoke<RandomUserPreferences>("getUserPreferences");
        setSefaultFormState(userPreferences);
      } catch (err) {
        console.error(err);
      } finally {
        setInitDone(true);
      }
    }
    initialise();
  }, []);

  if (!initDone) {
    return <Spinner />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(setPreferences)}>
        <FormHeader>
          <Text>Change settings for random user generation</Text>
        </FormHeader>
        <FormSection>
          <Label labelFor={getFieldId("gender")}>
            Gender
            <RequiredAsterisk />
          </Label>
          <RadioGroup
            {...register("gender", { required: true })}
            name="gender"
            options={GENDERS_OPTIONS}
            defaultValue={defaultFormState?.gender}
          />
          {formState.errors["gender"] && (
            <ErrorMessage>Gender required</ErrorMessage>
          )}
        </FormSection>
        <FormFooter align="start">
          <LoadingButton
            appearance="primary"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Save
          </LoadingButton>
        </FormFooter>
      </Form>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
