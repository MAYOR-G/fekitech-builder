"use client";
import BatchTemplate from "../_uk-batch/BatchTemplate";
import defaults from "./editable.json";
import "./styles.css";
import "../_uk-batch/base.css";
import type { TemplateData } from "@/lib/template-data";
export default function Template({ data }: { data: TemplateData }) { return <BatchTemplate id="little-lanterns-nursery" layout={8} defaults={defaults} data={data} />; }
