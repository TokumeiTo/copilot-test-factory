---
description: Universally extracts an unbundled, multi-axis test matrix from any specification document.
temperature: 0.1
---

Thoroughly analyze the provided design specification document for the target scope requested by the user.

## CRITICAL CONSTRAINTS
- **No Bundling:** Every single test case row must verify exactly ONE unique combination of system parameters. Do not group multiple channels, modules, or operation types together with slashes.
- **Mandatory Permutation Axes:** You must explicitly extract and vary the following dimensions in the "InputData" string to ensure absolute coverage:
  1. チャネル (e.g., タブレット, FR)
  2. 機能モジュール (e.g., 通常注文, 取引シミュレーション)
  3. 注文種別 (e.g., 買付, 応募, 定時定額)
  4. 注文日 (e.g., 当日, 翌営業日)
  5. 会社設定 (e.g., 先日付可, 先日付不可)
  6. 口座開設種別 (e.g., 簡易開設, 再開設, 金融機関変更)
- Output ONLY a single valid JSON block containing the root "test_cases" array.

## OUTPUT FORMAT SPECIFICATION
{
  "test_cases": [
    {
      "No": 1,
      "Category": "Test phase / type",
      "TextItem": "Short description of verified parameters",
      "Precondition": "Prerequisites",
      "Steps": "1. Step\n2. Step",
      "InputData": "Format strictly as -> チャネル:Value; 機能モジュール:Value; 注文種別:Value; 注文日:Value; 会社設定:Value; 口座開設種別:Value",
      "ExpectedResult": "Expected system actions",
      "Priority": "High/Medium/Low"
    }
  ]
}