import type { InjectionKey } from "vue";
import type User from "./src/types/User";

export const userInjectionKey = Symbol() as InjectionKey<User>;