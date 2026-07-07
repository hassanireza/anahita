import { Pantheon, PantheonRegistry } from "../models/Pantheon";
import { persiaPantheon } from "./persia";
import { egyptPantheon } from "./egypt";
import { greekPantheon } from "./greek";

export const persia = new Pantheon(persiaPantheon);
export const egypt = new Pantheon(egyptPantheon);
export const greek = new Pantheon(greekPantheon);

/** Single shared instance used across the application. */
export const registry = new PantheonRegistry([persia, egypt, greek]);
