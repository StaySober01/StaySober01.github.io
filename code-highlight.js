(function () {
  const keywordPattern = /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|break|case|catch|class|compl|concept|const|consteval|constexpr|constinit|continue|co_await|co_return|co_yield|decltype|default|delete|do|dynamic_cast|else|enum|explicit|export|extern|for|friend|goto|if|inline|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|using|virtual|volatile|while|xor|xor_eq)\b/g;
  const typePattern = /\b(bool|char|char8_t|char16_t|char32_t|double|float|int|long|short|signed|unsigned|void|wchar_t|string|vector|set|map|unordered_map|unordered_set|pair|queue|stack|priority_queue|size_t)\b/g;
  const tokenPattern = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|#include\s+<[^>]+>|#\w+[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|==|!=|<=|>=|&&|\|\||[-+*/%=!<>])/g;

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function classForToken(token) {
    if (token.startsWith("//") || token.startsWith("/*")) return "code-token-comment";
    if (token.startsWith("#")) return "code-token-preprocessor";
    if (token.startsWith("\"") || token.startsWith("'")) return "code-token-string";
    if (/^\d/.test(token)) return "code-token-number";
    if (/^(==|!=|<=|>=|&&|\|\||[-+*/%=!<>])$/.test(token)) return "code-token-operator";
    if (keywordPattern.test(token)) {
      keywordPattern.lastIndex = 0;
      return "code-token-keyword";
    }
    keywordPattern.lastIndex = 0;
    if (typePattern.test(token)) {
      typePattern.lastIndex = 0;
      return "code-token-type";
    }
    typePattern.lastIndex = 0;
    return "";
  }

  function highlight(code) {
    const source = code.textContent;
    let output = "";
    let cursor = 0;

    source.replace(tokenPattern, function (token, _match, offset) {
      output += escapeHtml(source.slice(cursor, offset));

      const tokenClass = classForToken(token);
      const escapedToken = escapeHtml(token);
      output += tokenClass
        ? `<span class="${tokenClass}">${escapedToken}</span>`
        : escapedToken;

      cursor = offset + token.length;
      return token;
    });

    output += escapeHtml(source.slice(cursor));
    code.innerHTML = output;
    code.dataset.highlighted = "true";
  }

  function highlightAll() {
    document.querySelectorAll(".post-content pre code").forEach(function (code) {
      if (!code.dataset.highlighted) highlight(code);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", highlightAll);
  } else {
    highlightAll();
  }
})();
