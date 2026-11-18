"""Gera projeto/wireframe.html a partir de projeto/simulacao-src.html,
embutindo as capturas reais como data URI (a página publicada não carrega arquivos externos).
Uso: python3 projeto/montar-simulacao.py
"""
import base64
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src = (root / 'projeto' / 'simulacao-src.html').read_text(encoding='utf-8')
imgs = {
    '{{IMG_CALMA72}}': 'assets/projects/calma72/capa-720.webp',
    '{{IMG_CEIA}}': 'assets/projects/ceia/capa-720.webp',
    '{{IMG_BILHAR}}': 'assets/projects/bilhar-dourado/capa-720.webp',
}
for key, rel in imgs.items():
    data = base64.b64encode((root / rel).read_bytes()).decode('ascii')
    src = src.replace(key, 'data:image/webp;base64,' + data)
(root / 'projeto' / 'wireframe.html').write_text(src, encoding='utf-8')
print('ok', len(src) // 1024, 'KB')
