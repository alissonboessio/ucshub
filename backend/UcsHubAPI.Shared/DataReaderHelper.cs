using System;
using System.Data.Common;

namespace UcsHubAPI.Shared
{
    public static class DataReaderHelper
    {
        public static string GetStringH(this DbDataReader reader, string columnName, string defaultValue = null)
        {
            var ordinal = reader.GetOrdinal(columnName);
            return reader.IsDBNull(ordinal) ? defaultValue : reader.GetString(ordinal);
        }

        public static int? GetIntH(this DbDataReader reader, string columnName, int? defaultValue = null)
        {
            var ordinal = reader.GetOrdinal(columnName);
            return reader.IsDBNull(ordinal) ? defaultValue : reader.GetInt32(ordinal);
        }

        public static DateTime? GetDateTimeH(this DbDataReader reader, string columnName, DateTime? defaultValue = null)
        {
            var ordinal = reader.GetOrdinal(columnName);
            return reader.IsDBNull(ordinal) ? defaultValue : reader.GetDateTime(ordinal);
        }

        public static bool? GetBooleanH(this DbDataReader reader, string columnName, bool? defaultValue = null)
        {
            var ordinal = reader.GetOrdinal(columnName);
            return reader.IsDBNull(ordinal) ? defaultValue : reader.GetBoolean(ordinal);
        }

        public static byte? GetByteH(this DbDataReader reader, string columnName, byte? defaultValue = null)
        {
            var ordinal = reader.GetOrdinal(columnName);
            return reader.IsDBNull(ordinal) ? defaultValue : reader.GetByte(ordinal);
        }
    }
}
