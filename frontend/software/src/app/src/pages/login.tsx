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
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);

    const response = await fetch(`http://localhost:3000/auth/staff-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(response.status);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
    if (response.status === 401) {
      toast.error("Invalid credentials");
    }
    if (response.status === 404) {
      toast.error("User not found");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full overflow-hidden ">
      <ToastContainer />
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
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} type="email" placeholder="Email" />
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
                      <PassInput
                        {...field}
                        onChange={(e) => {
                          form.setValue("password", e.target.value);
                        }}
                        placeholder="Password"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
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
