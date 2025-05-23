import type { TransformOptions } from '@babel/core';
import type { File } from '@babel/types';

import type { IVariableContext } from '../IVariableContext';
import type { Core } from '../babel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VmContext = Record<string, any>; // It's Context from `vm`

export type ClassNameSlugVars = {
  dir: string;
  ext: string;
  file: string;
  hash: string;
  index: number;
  name: string;
  title: string;
};

export type ClassNameFn = (
  hash: string,
  title: string,
  args: ClassNameSlugVars
) => string;

export type VariableNameFn = (context: IVariableContext) => string;

export type EvaluatorConfig = {
  features: StrictOptions['features'];
  highPriorityPlugins: string[];
  onlyExports: string[];
};

export type Evaluator = (
  evalConfig: TransformOptions,
  ast: File,
  code: string,
  config: EvaluatorConfig,
  babel: Core
) => [
  ast: File,
  code: string,
  imports: Map<string, string[]> | null,
  exports?: string[] | null,
];

export type EvalRule = {
  action: Evaluator | 'ignore' | string;
  babelOptions?: TransformOptions;
  test?: RegExp | ((path: string, code: string) => boolean);
};

export type FeatureFlag = boolean | string | string[];

type AllFeatureFlags = {
  dangerousCodeRemover: FeatureFlag;
  globalCache: FeatureFlag;
  happyDOM: FeatureFlag;
  softErrors: FeatureFlag;
  useBabelConfigs: FeatureFlag;
  useWeakRefInEval: FeatureFlag;
};

export type FeatureFlags<
  TOnly extends keyof AllFeatureFlags = keyof AllFeatureFlags,
> = Pick<AllFeatureFlags, TOnly>;

export type CodeRemoverOptions = {
  componentTypes?: Record<string, string[]>;
  hocs?: Record<string, string[]>;
};

export type StrictOptions = {
  babelOptions: TransformOptions;
  classNameSlug?: string | ClassNameFn;
  codeRemover?: CodeRemoverOptions;
  displayName: boolean;
  evaluate: boolean;
  extensions: string[];
  features: FeatureFlags;
  highPriorityPlugins: string[];
  ignore?: RegExp;
  overrideContext?: (
    context: Partial<VmContext>,
    filename: string
  ) => Partial<VmContext>;
  rules: EvalRule[];
  tagResolver?: (source: string, tag: string) => string | null;
  variableNameConfig?: 'var' | 'dashes' | 'raw';
  variableNameSlug?: string | VariableNameFn;
};
