import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";

// Allow-list for rich-text content coming from the CMS/settings API.
// Scripts, iframes, event handlers (onclick=...), javascript: URLs etc. are stripped.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "span",
    "u",
    "s",
    "del",
    "ins",
    "sub",
    "sup",
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    "*": ["class", "style"],
  },
  allowedStyles: {
    "*": {
      color: [/^[#a-z0-9(),.%\s-]+$/i],
      "background-color": [/^[#a-z0-9(),.%\s-]+$/i],
      "text-align": [/^(left|right|center|justify)$/],
      "font-size": [/^\d+(\.\d+)?(px|em|rem|%)$/],
      "font-weight": [/^(normal|bold|bolder|lighter|\d{3})$/],
      "font-style": [/^(normal|italic)$/],
      "text-decoration": [/^[a-z\s-]+$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: false,
  transformTags: {
    // Links that open a new tab must not get a handle on window.opener.
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

const SafeHtml = ({ html }: { html?: string | null }) => {
  if (!html) return null;
  return <>{parse(sanitizeHtml(html, SANITIZE_OPTIONS))}</>;
};

export default SafeHtml;
