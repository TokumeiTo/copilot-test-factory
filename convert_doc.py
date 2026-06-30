import os
from pathlib import Path
from markitdown import MarkItDown

def batch_convert_specifications(input_dir: str, output_dir: str):
    """
    Scans the input directory for all .docx and .xlsx files, converts them
    to LLM-optimized Markdown, and outputs them into the target folder.
    """
    # Initialize the conversion engine
    md_engine = MarkItDown()
    
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    # Ensure the destination path exists
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Gather supported specifications
    supported_extensions = [".docx", ".xlsx"]
    files_to_process = [f for f in input_path.iterdir() if f.suffix.lower() in supported_extensions]
    
    if not files_to_process:
        print(f"📁 No matching files found in '{input_dir}'. Drop your .docx / .xlsx files there.")
        return

    print(f"🚀 Found {len(files_to_process)} specifications. Beginning batch pipeline...")
    print("-" * 60)

    for file_file in files_to_process:
        original_name = file_file.stem
        extension = file_file.suffix.lower()
        
        # Structure clear naming variants for output target logs
        output_file_name = f"{original_name}.md"
        target_md_path = output_path / output_file_name
        
        print(f"⏳ Converting [{extension.upper()}]: {file_file.name} ...")
        
        try:
            # MarkItDown natively handles parsing structural elements, layouts, and data grids
            result = md_engine.convert(str(file_file))
            
            with open(target_md_path, "w", encoding="utf-8") as f:
                f.write(result.text_content)
                
            print(f"✅ Saved to: {target_md_path}")
            
        except Exception as e:
            print(f"❌ Failed to parse {file_file.name}: {str(e)}")
            
    print("-" * 60)
    print("✨ Batch processing pipeline complete!")

if __name__ == "__main__":
    # Define folder structure boundaries
    INPUT_FOLDER = "docs/raw_specs"
    OUTPUT_FOLDER = "docs/specifications"
    
    batch_convert_specifications(INPUT_FOLDER, OUTPUT_FOLDER)