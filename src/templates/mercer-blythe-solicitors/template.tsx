"use client";
import BatchTemplate from "../_uk-batch/BatchTemplate";
import defaults from "./editable.json";
import "./styles.css";
import "../_uk-batch/base.css";
import type { TemplateData } from "@/lib/template-data";
export default function Template({ data }: { data: TemplateData }) { return <BatchTemplate id="mercer-blythe-solicitors" layout={3} defaults={defaults} data={data} />; }
