#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

RUN curl -sL https://deb.nodesource.com/setup_16.x |  bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["ContactsAPI/ContactsAPI.csproj", "ContactsAPI/"]
RUN dotnet restore "ContactsAPI/ContactsAPI.csproj"
COPY . .
WORKDIR "/src/ContactsAPI"
RUN dotnet build "ContactsAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContactsAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ContactsAPI.dll"]