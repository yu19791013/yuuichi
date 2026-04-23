// 画面切り替え
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(id).style.display = "block";
    document.getElementById("menu").style.display = "none";
}

function backMenu() {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById("menu").style.display = "block";
}

// ① 作業報告書 PDF生成
function generatePDF() {
    const date = document.getElementById("workDate").value;
    const site = document.getElementById("siteName").value;
    const detail = document.getElementById("workDetail").value;

    let text = `【作業報告書】\n\n日付：${date}\n現場名：${site}\n\n【作業内容】\n${detail}\n`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "作業報告書.txt";
    a.click();
}

// ② 社内FAQ（AI回答：OpenAI 接続版）
async function askAI() {
    const q = document.getElementById("faqInput").value;
    document.getElementById("faqOutput").textContent = "回答生成中…";

   const apiKey = "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";
 bHpy54NyNb-6gpM24alcA";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "あなたは社内FAQに答えるアシスタントです。" },
                { role: "user", content: q }
            ]
        })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "回答を取得できませんでした。";

    document.getElementById("faqOutput").textContent = answer;
}

// ③ 顧客メール自動返信
function generateMail() {
    const text = document.getElementById("mailInput").value;

    const template = 
`【顧客返信テンプレ】

お問い合わせありがとうございます。

以下の内容について確認いたしました：
${text}

担当部署と連携し、対応を進めてまいります。
引き続きよろしくお願いいたします。`;

    document.getElementById("mailOutput").textContent = template;
}

// ④ CSV整形
function processCSV() {
    const file = document.getElementById("csvInput").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const lines = e.target.result.split("\n");
        const cleaned = lines.map(l => l.trim()).join("\n");
        document.getElementById("csvOutput").textContent = cleaned;
    };
    reader.readAsText(file);
}

// ⑤ 議事録 → 要点抽出
function summarize() {
    const text = document.getElementById("summaryInput").value;

    const summary = 
`【要点まとめ】
・議事録の主要ポイントを抽出します
・重要な決定事項を整理します
・次回までのアクションを明確化します

（※AI接続前のテスト動作）`;

    document.getElementById("summaryOutput").textContent = summary;
}

