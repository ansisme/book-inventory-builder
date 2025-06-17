const Loader = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
    <style>{`
      .loader {
        border-width: 4px;
        border-style: solid;
        border-radius: 9999px;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

export default Loader
