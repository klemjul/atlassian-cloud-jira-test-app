import ForgeUI, {
  AdminPage,
  render,
  Text,
  Form,
  RadioGroup,
  Radio,
  useState,
} from "@forge/ui";
import { randomUserPreferencesStore, RandomUserPreferences } from "./storage";
import { ForgeElement } from "@forge/react/out/types";

const POSSIBLE_GENDERS = ["male", "female", "random"];

const App = (): ForgeElement => {
  const [formState, setFormState] = useState<RandomUserPreferences | undefined>(
    {
      gender: "random",
    },
  );

  const onSubmit = async (formData: RandomUserPreferences) => {
    await randomUserPreferencesStore.setPreferences(formData);
    setFormState(formData);
  };

  return (
    <AdminPage>
      <Text>Change settings to generation</Text>
      <Form onSubmit={onSubmit}>
        <RadioGroup name="gender" label="User gender:">
          {POSSIBLE_GENDERS.map((possibleGender) => {
            return (
              <Radio
                defaultChecked={formState?.gender === possibleGender}
                label={possibleGender}
                value={possibleGender}
              />
            );
          })}
        </RadioGroup>
      </Form>
    </AdminPage>
  );
};

export const renderRandomUserAdmin = render(<App />);
