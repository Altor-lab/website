import { content } from '../content'

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-white/10">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{content.footer.copyright}</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href={content.footer.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-gray-700">•</span>
            <span className="text-gray-500">{content.footer.privacy}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
