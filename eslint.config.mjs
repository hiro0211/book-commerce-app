import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // 未使用の変数を警告に変更
      "@typescript-eslint/no-explicit-any": "off", // `any` の使用を許可
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // 非 null アサーションのエラーを無効化
      "@typescript-eslint/no-unsafe-function-type": "off", // `Function` 型の使用を許可
      "@typescript-eslint/no-empty-object-type": "warn", // `{}` を使うときに警告のみ
      "react-hooks/exhaustive-deps": "warn", // `useEffect` の依存関係エラーを警告に変更
      "prefer-const": "warn", // `const` 推奨にするが、エラーにはしない
      "react/jsx-no-comment-textnodes": "warn", // コメントエラーを警告に変更
    },
  },
];

export default eslintConfig;
