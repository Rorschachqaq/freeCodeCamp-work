import socket
from common_ports import ports_and_services

def get_open_ports(target, port_range, verbose=False):
    open_ports = []
    ip = None
    hostname = None

    # 检查是否为有效的IP地址
    if is_valid_ip(target):
        ip = target
    else:
        try:
            ip = socket.gethostbyname(target)
            hostname = target
        except socket.gaierror:
            return "Error: Invalid hostname"

    # 再次检查IP的有效性
    if not is_valid_ip(ip):
        return "Error: Invalid IP address"

    # 扫描端口范围
    for port in range(port_range[0], port_range[1] + 1):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        result = sock.connect_ex((ip, port))
        if result == 0:
            open_ports.append(port)
        sock.close()

    if not verbose:
        return open_ports

    # 如果是详细模式，格式化输出
    target_display = f"{hostname} ({ip})" if hostname else ip
    open_ports_str = f"Open ports for {target_display}\nPORT     SERVICE\n"
    
    for port in open_ports:
        service_name = ports_and_services.get(port, 'unknown')
        open_ports_str += f"{port:<9} {service_name}\n"

    return open_ports_str.strip()

def is_valid_ip(ip):
    """验证IP地址格式是否正确"""
    try:
        socket.inet_aton(ip)
        return True
    except socket.error:
        return False
