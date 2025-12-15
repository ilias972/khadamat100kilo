import Link from 'next/link';

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-900">🗺️ Carte du Site (Mode Dev)</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SECTION PUBLIQUE */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-xl font-bold mb-4 flex items-center">🌍 Pages Publiques</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-600 hover:underline">🏠 Accueil (/)</Link></li>
              <li><Link href="/services" className="text-blue-600 hover:underline">🛠️ Services (/services)</Link></li>
              <li><Link href="/pros" className="text-blue-600 hover:underline">👷 Liste des Pros (/pros)</Link></li>
              <li><Link href="/devenir-pro" className="text-blue-600 hover:underline">🚀 Devenir Pro (/devenir-pro)</Link></li>
              <li><Link href="/blog" className="text-blue-600 hover:underline">📰 Blog (/blog)</Link></li>
              <li><Link href="/contact" className="text-blue-600 hover:underline">📞 Contact (/contact)</Link></li>
              <li><Link href="/faq" className="text-blue-600 hover:underline">❓ FAQ (/faq)</Link></li>
            </ul>
          </div>

          {/* SECTION AUTH */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h2 className="text-xl font-bold mb-4 flex items-center">🔐 Authentification</h2>
            <ul className="space-y-2">
              <li><Link href="/auth/login" className="text-green-600 hover:underline">🔑 Connexion (/auth/login)</Link></li>
              <li><Link href="/auth/signup" className="text-green-600 hover:underline">📝 Inscription (/auth/signup)</Link></li>
            </ul>
          </div>

          {/* SECTION CLIENT */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <h2 className="text-xl font-bold mb-4 flex items-center">👤 Espace Client (Protégé)</h2>
            <p className="text-xs text-gray-500 mb-2">Nécessite d'être connecté comme Client</p>
            <ul className="space-y-2">
              <li><Link href="/dashboard/client" className="text-purple-600 hover:underline">📊 Dashboard Client (/dashboard/client)</Link></li>
              <li><Link href="/profile" className="text-purple-600 hover:underline">⚙️ Profil (/profile)</Link></li>
              <li><Link href="/messages" className="text-purple-600 hover:underline">💬 Messages (/messages)</Link></li>
              <li><Link href="/search" className="text-purple-600 hover:underline">🔍 Recherche Avancée (/search)</Link></li>
            </ul>
          </div>

          {/* SECTION PRO */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <h2 className="text-xl font-bold mb-4 flex items-center">👷 Espace Pro (Protégé)</h2>
            <p className="text-xs text-gray-500 mb-2">Nécessite d'être connecté comme Pro</p>
            <ul className="space-y-2">
              <li><Link href="/dashboard/pro" className="text-orange-600 hover:underline">📊 Dashboard Pro (/dashboard/pro)</Link></li>
              <li><Link href="/pro/1" className="text-orange-600 hover:underline">📄 Exemple Profil Public Pro (/pro/1)</Link></li>
            </ul>
          </div>

          {/* SECTION ADMIN */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <h2 className="text-xl font-bold mb-4 flex items-center">👮 Espace Admin</h2>
            <ul className="space-y-2">
              <li><Link href="/admin/dashboard" className="text-red-600 hover:underline">🎛️ Admin Dashboard (/admin/dashboard)</Link></li>
              <li><Link href="/debug" className="text-red-600 hover:underline">🐛 Debug Page (/debug)</Link></li>
            </ul>
          </div>
          
           {/* LEGAL */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
            <h2 className="text-xl font-bold mb-4 flex items-center">⚖️ Légal</h2>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:underline">Confidentialité</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:underline">CGU</Link></li>
              <li><Link href="/mentions-legales" className="text-gray-600 hover:underline">Mentions Légales</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}