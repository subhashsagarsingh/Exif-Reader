import React from "react";
import MapView from "./MapView"; // make sure this import path is correct

const ExifViewer = ({ data }) => {
  if (!data) return null;

  const hasGPS = data.GPSLatitude && data.GPSLongitude;

  return (
    <div className="mt-4 bg-gray-50 rounded-xl shadow-inner p-4 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">EXIF Data</h3>

      {/* Show Map if GPS exists */}
      {hasGPS ? (
        <MapView lat={data.GPSLatitude} lon={data.GPSLongitude} />
      ) : (
        <p className="text-sm text-red-500 mb-3">No GPS data available</p>
      )}

      <table className="w-full text-sm">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="border-b last:border-0">
              <td className="py-1 pr-3 font-medium text-gray-600">{key}</td>
              <td className="py-1 text-blue-600">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExifViewer;
