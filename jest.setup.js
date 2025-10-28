import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import { loadQuestions } from "../script.js";
import React, { useState } from "react";
import NavBar from "./NavBar";
import QuestionCard from "./QuestionCard";
import questions from "./data";