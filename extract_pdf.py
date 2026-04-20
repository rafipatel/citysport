import sys
import Quartz

def extract_text_from_pdf(pdf_path):
    pdf_url = Quartz.CFURLCreateFromFileSystemRepresentation(None, pdf_path.encode('utf-8'), len(pdf_path), False)
    pdf_doc = Quartz.CGPDFDocumentCreateWithURL(pdf_url)
    
    if not pdf_doc:
        return "Failed to open PDF"
        
    num_pages = Quartz.CGPDFDocumentGetNumberOfPages(pdf_doc)
    print(f"Pages: {num_pages}")

extract_text_from_pdf("CitySport-Terms-and-Conditions-V3-Sep2025.pdf")
