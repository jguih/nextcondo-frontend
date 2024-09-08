import { z } from "zod";

const login = z.object({});
const logout = z.object({});
const register = z.object({});

export const authSchema = { login, logout, register };
