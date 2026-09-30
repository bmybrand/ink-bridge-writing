import http.server, urllib.parse, urllib.request, os, mimetypes
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ALLOWED_REMOTE_HOSTS = {
    "images.unsplash.com",
    "cdn.sanity.io",
    "plus.unsplash.com",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/_next/image":
            qs = urllib.parse.parse_qs(parsed.query)
            url = qs.get("url", [""])[0]
            url = urllib.parse.unquote(url)

            # Local image paths
            if url.startswith("/"):
                rel = url.split("?", 1)[0].lstrip("/")
                target = (ROOT / rel).resolve()
                if str(target).startswith(str(ROOT)) and target.is_file():
                    data = target.read_bytes()
                    ctype = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
                    self.send_response(200)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Content-Length", str(len(data)))
                    self.send_header("Cache-Control", "public, max-age=3600")
                    self.end_headers()
                    self.wfile.write(data)
                    return
                self.send_error(404, "image not found")
                return

            # Remote images (Unsplash / Sanity used by blog covers)
            if url.startswith("http://") or url.startswith("https://"):
                try:
                    remote = urllib.parse.urlparse(url)
                    if remote.hostname not in ALLOWED_REMOTE_HOSTS:
                        self.send_error(403, "remote host not allowed")
                        return
                    req = urllib.request.Request(
                        url,
                        headers={"User-Agent": "InkBridgeLocalServer/1.0"},
                    )
                    with urllib.request.urlopen(req, timeout=20) as resp:
                        data = resp.read()
                        ctype = resp.headers.get("Content-Type") or "image/jpeg"
                    self.send_response(200)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Content-Length", str(len(data)))
                    self.send_header("Cache-Control", "public, max-age=86400")
                    self.end_headers()
                    self.wfile.write(data)
                    return
                except Exception as exc:
                    self.send_error(502, f"remote image failed: {exc}")
                    return

            self.send_error(404, "image not found")
            return
        return super().do_GET()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5173"))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"Serving Ink Bridge on http://127.0.0.1:{port}", flush=True)
    httpd.serve_forever()
