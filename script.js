async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("Helvetica", "normal");

    // タイトル
    doc.setFontSize(18);
    doc.text("作業報告書", 20, 20);

    doc.setFontSize(12);

    // 基本情報
    doc.text(`作業日: ${document.getElementById("workDate").value}`, 20, 40);
    doc.text(`現場名: ${document.getElementById("siteName").value}`, 20, 50);
    doc.text(`担当者: ${document.getElementById("person").value}`, 20, 60);
    doc.text(`作業区分: ${document.getElementById("type").value}`, 20, 70);

    // 作業内容
    doc.setFontSize(14);
    doc.text("作業内容", 20, 90);

    doc.setFontSize(12);
    const content = doc.splitTextToSize(document.getElementById("content").value, 170);
    doc.text(content, 20, 100);

    // 保存
    doc.save("report_test.pdf");
}
