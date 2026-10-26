"""Offline integrity contract for the pinned upstream QA reference copy."""
import hashlib
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
REVISION = '0a4d1d099651d5bcedb49f85965eeb02bbdb0c98'
EXPECTED = {'00-qa-test-request.md': '0307ff61f4c216184693d2033e608e1d6c8fbfb9cf1cca5ef4177e1b46d7bdb0', '01-quality-risk-assessment.md': '5cf9c2e7ad4a4d2778d4bb93869b9a3b4fcd2598778ffad55a003a8e15f1c854', '02-test-spec.md': 'd1f018b678fc16d991c3a0a8877665bcf75a9393baa06ca7fe7926530fa43523', '03-test-scenario.md': '54113eb107e9401be32a0eefb8986089816bc86e9be3f695c354eaa9798cc6cd', '04-test-case.md': '751784d394c3d346b880ada86cfddcf9642a91dee4abaca63cf1ed96f247404e', '05-test-run-record.md': '030abf9fbe8768814a3f466374bf3afe9837d3b2536c7ef66ee622db62368345', '06-defect-report.md': '608b92af2383e4614a18d7283e6bc64e3b8ff764156a457abd0fd0367d533467', '07-release-quality-summary.md': '2653fcc44cb38eec5ab9a1c9411af247efebbb99f8c3634efdc3ed7c3138fdae', '08-dashboard-status-contract.md': 'fa4169c8577b05966d0a75301d86158210a8f07b5d7d0163e52ca0e6bd62e0c2'}

class MirrorTests(unittest.TestCase):
    def test_exactly_nine_version_pinned_templates(self):
        folder = ROOT / 'Templates/QA'
        self.assertEqual(set(EXPECTED), {p.name for p in folder.glob('0[0-8]-*.md')})
        for name, digest in EXPECTED.items():
            with self.subTest(name=name):
                data = (folder / name).read_text(encoding='utf-8').replace('\r\n', '\n')
                self.assertIn('templateVersion: 0.3.0', data)
                self.assertEqual(hashlib.sha256(data.encode()).hexdigest(), digest)

    def test_navigation_and_upstream_language_pairs(self):
        text = (ROOT / 'Templates/QA/README.md').read_text(encoding='utf-8')
        self.assertIn(REVISION, text)
        self.assertIn('固定版本參考副本', text)
        self.assertIn('brief/design、run ledger、decision', text)
        urls = re.findall(r'\]\(([^)]+)\)', text)
        examples = {u for u in urls if '/public/qa-templates/' in u}
        self.assertEqual(len(examples), 20)
        self.assertTrue(all(REVISION in u for u in examples))
        for url in urls:
            if '://' not in url:
                self.assertTrue((ROOT / 'Templates/QA' / url).is_file(), url)
        index = (ROOT / 'wiki/一人軟體測試公司/_index.md').read_text(encoding='utf-8')
        self.assertIn('[[Templates/QA/README|', index)

if __name__ == '__main__':
    unittest.main()
