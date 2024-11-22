import { z } from "zod";
import svg from "../assets/login_hero.jpg";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PassInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginShema = z.object({
  username: z.string(),
  password: z.string(),
});
const Login = () => {
  const form = useForm<z.infer<typeof loginShema>>();
  const onLogin = (values: z.infer<typeof loginShema>) => {
    console.log(values);
  };
  return (
    <div className="h-screen w-full overflow-hidden ">
      <div className="w-full h-[30px] flex px-4 items-center shadow relative z-50">
        <h1 className="font-medium text-sm">CMS</h1>
      </div>
      <div className="grid h-[calc(100vh-30px)]  grid-cols-2">
        <div className="px-8 py-8">
          <div className="">
            <h1 className="text-3xl font-bold font-mono">CMS</h1>
            <h1 className="font-mono text-xs">By something</h1>
          </div>
          <div className="flex-1 flex h-full justify-center items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onLogin)}
                className="w-full flex flex-col gap-3 px-9"
              >
                <h1 className=" text-3xl font-bold mb-9">Login</h1>

                <FormField
                  name="username"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input {...field} type="text" placeholder="Username" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <PassInput {...field} placeholder="Password" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Login</Button>
                <h2 className="text-xs">Forgot Your Password?</h2>
                <p className="text-xs">
                  If you have forgotten your password, please contact our
                  technical support team for assistance.
                </p>
              </form>
            </Form>
          </div>
        </div>
        <div className="bg-primary flex items-end overflow-hidden relative">
          <img
            src={svg}
            alt="asdasd"
            className="w-full object-cover object-center"
          />
          <div className="w-full h-screen bg-black absolute top-0 opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
