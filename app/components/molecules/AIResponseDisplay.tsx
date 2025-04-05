interface AIResponseDisplayProps {
  response: string;
  error?: string;
}

export const AIResponseDisplay = ({ response, error }: AIResponseDisplayProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">AI応答</h2>
      {error ? (
        <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200">
          <p className="font-medium">エラーが発生しました</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : response ? (
        <div className="p-3 bg-gray-50 rounded border border-gray-200">
          <p className="whitespace-pre-wrap text-gray-800">{response}</p>
        </div>
      ) : (
        <div className="p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-gray-400 italic">AIの応答を待っています...</p>
        </div>
      )}
    </div>
  );
};
