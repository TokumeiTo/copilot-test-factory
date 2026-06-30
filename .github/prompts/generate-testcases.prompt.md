---
description: Extracts standard manual test case data structures from Markdown specifications.
temperature: 0.1
---

You are to thoroughly analyze the design specifications provided in the referenced user file. 
Identify all normal execution paths, exceptional branches, input validation rules, and error messaging constraints.

Generate a comprehensive test matrix matching the target context.

## Output Format Specification
Your response must consist solely of a valid JSON object matching this exact schema layout. Do not wrap it in prose or explanation outside the markdown code fence:

{
  "test_cases": [
    {
      "No": 1,
      "Category": "単体テスト / 異常系",
      "TextItem": "詳細なテスト項目検証内容",
      "Precondition": "テスト実施前に必要な前提条件",
      "Steps": "1. 画面を開く\n2. 該当項目を入力、確定する",
      "InputData": "テスト実行に使用する具体的な値や状態データ",
      "ExpectedResult": "期待されるシステムの挙動、エラー表示、またはDB変更結果",
      "Priority": "High"
    }
  ]
}