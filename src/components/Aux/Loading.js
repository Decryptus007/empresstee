export default function Loading() {
  return (
    <div style={{ zIndex: 100 }} className={`fixed top-0 left-0 h-screen w-full bg-white/50 pt-44`}>
      <div className="loader">Loading...</div>
    </div>
  );
}
